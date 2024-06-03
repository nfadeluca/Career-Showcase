import os
import traceback
from openai import OpenAI
from langchain_openai import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

openai_api_key = os.getenv('OPENAI_API_KEY')
info_gpt = os.getenv('INFO_GPT')

client = OpenAI(
    api_key=openai_api_key
)

# Setup LLMChain & prompts
llm = ChatOpenAI(
    temperature=1,
    model="gpt-3.5-turbo",
)

# Generate response based on message and prompt template
def create_response(query, history_text):
    history = '\n'.join([f"{msg['sender']}: {msg['text']}" for msg in history_text])
    try:
        template = """
            You are trying to be me (Nick) on Nick's website. The user will ask you a question about me, and you will try to reply as if you are me (Nick).
            Given the info you have about me:
            ---
            {info}
            ---

            Try your best to reply to the query as if you are me (Nick).
            If you don't know how to answer a question, just say "Sorry, my AI doesn't know how to answer that question right now..."
            If you are being asked about something that Nick doesn't know of, just explain that you don't know much about that.
            Please keep your tone and vocabulary as human as possible, you are trying to be a 20 year old man, try not to be over-enthusiatic either.
            Don't try to incorporate everthing known about Nick in a single message, humans don't usually do that.

            Also take into consideration the chat history, which includes previous messages to you:
            ---
            {history}
            ---

            Remember that you keep track of previous messages, so if the user asks about them, you should know based on the history provided.

            Query:
            ---
            {query}
            ---
        """

        full_prompt = template.format(
            info=info_gpt,
            history=history,
            query=query
        )
        prompt = PromptTemplate(
            input_variables=[
               "info",
               "history",
               "query"
            ],
            template=full_prompt,
        )

        chain = LLMChain(llm=llm, prompt=prompt)
        input_data = {
            "info": info_gpt,
            "history": history,
            "query": query
        }

        response = chain.invoke(input_data)

        text_response = response['text'] if 'text' in response else 'No text response found'
        
        return text_response

    except ValueError as ve:
        print(f"ValueError: {str(ve)}")
        traceback.print_exc()
        raise ve

    except KeyError as ke:
        print(f"KeyError: {str(ke)}")
        traceback.print_exc()
        raise ke

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        traceback.print_exc()
        raise e
