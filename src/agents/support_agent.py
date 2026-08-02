# src/agents/support_agent.py
from typing import TypedDict, Annotated
from langchain_ollama import ChatOllama
from langchain_core.messages import SystemMessage, HumanMessage, BaseMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.checkpoint.memory import MemorySaver
from src.services.rag_service import RAGService

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    context: str

class SupportAgent:
    def __init__(self, model_name: str = "llama3"):
        # LLM ve Graph bir kez iliskilendirilir (Stateless ve Concurrency-Safe)
        self.llm = ChatOllama(
            model=model_name, 
            temperature=0.1,
            repeat_penalty=1.18,
            top_p=0.9,
            num_predict=200,
            num_ctx=2048,
        )
        self.checkpointer = MemorySaver()
        self.graph = self._build_graph()

    async def _retrieve_node(self, state: AgentState, config: dict) -> dict:
        rag_service: RAGService = config["configurable"]["rag_service"]
        latest_message = state["messages"][-1].content
        context = await rag_service.retrieve_context(latest_message, top_k=3)
        return {"context": context}

    async def _generate_node(self, state: AgentState) -> dict:
        context = state.get("context", "")

        system_prompt = (
            "Sen Support Agent AI adında kibar, profesyonel ve yardımsever bir müşteri destek asistanısın.\n\n"
            "ÖNEMLİ DİL KURALI:\n"
            "- SADECE VE SADECE TÜRKÇE YANIT VER.\n"
            "- Bilgi bankasındaki metinler veya kullanıcının mesajı başka dilde olsa bile yanıtını HER ZAMAN akıcı, anlaşılır bir Türkçe ile oluştur.\n"
            "- Yanıtında kesinlikle İngilizce kelime veya açıklama kullanma.\n\n"
            "GÖREVİN VE TALİMATLAR:\n"
            "1. Aşağıda verilen BİLGİ BANKASI metinlerini ve konuşma geçmişini kullanarak kullanıcının sorusunu yanıtla.\n"
            "2. ASLA KENDİNİ TEKRAR ETME: Aynı bilgiyi, şartı veya iletişim uyarısını yanıt içinde birden fazla kez yineleme. Yanıtlarını net, öz ve anlaşılır tut.\n"
            "3. MADDELİ ANLATIM: Birden fazla şart, adım veya kural içeren durumları okumayı kolaylaştırmak için maddeler (bullet points) halinde sun.\n"
            "4. Eğer aranan cevap bilgi bankasında veya önceki konuşmalarda yoksa, uydurma cevaplar verme; kibarca bu konuda bilgin olmadığını belirt.\n\n"
            f"--- BİLGİ BANKASI ---\n{context}"
        )

        messages = [SystemMessage(content=system_prompt)] + state["messages"]
        response = await self.llm.ainvoke(messages)
        return {"messages": [response]}

    def _build_graph(self):
        workflow = StateGraph(AgentState)

        workflow.add_node("retrieve", self._retrieve_node)
        workflow.add_node("generate", self._generate_node)

        workflow.set_entry_point("retrieve")
        workflow.add_edge("retrieve", "generate")
        workflow.add_edge("generate", END)

        return workflow.compile(checkpointer=self.checkpointer)

    async def run(self, question: str, thread_id: str, rag_service: RAGService) -> dict:
        """
        rag_service parametre olarak alınır ve LangGraph config nesnesiyle
        düğümlere (node) güvenli şekilde aktarılır.
        """
        config = {
            "configurable": {
                "thread_id": thread_id,
                "rag_service": rag_service 
            }
        }
        
        input_data = {"messages": [HumanMessage(content=question)]}
        result = await self.graph.ainvoke(input_data, config=config)
        
        return {
            "response": result["messages"][-1].content,
            "context": result.get("context", "")
        }

# Global tek bir instance oluşturulur (Tüm app ortak kullanır, hafızada yer kaplamaz)
support_agent = SupportAgent()