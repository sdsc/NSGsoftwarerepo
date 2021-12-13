import requests
import re
from bs4 import BeautifulSoup


def scrape_tools():
    URL = "https://nsgprod.sdsc.edu:8443/portal2/tools.action"
    response = requests.get(URL)
    soup = BeautifulSoup(response.content, "html.parser")
    tool_list = soup.find(class_="toollist")
    tools = tool_list.find_all("li")
    python_tool = [
        tool for tool in tools if tool.strong.a.string == "Python on Expanse"
    ]
    python_tool_list = python_tool[0].contents[-1].strip()
    start_index = python_tool_list.find(":") + 1
    python_tool_list = python_tool_list[start_index:].split(",")
    tools = [tool.contents[1].find("a").string.strip().split(" ")[0] for tool in tools]
    unique_tools = [
        tool for tool in tools if tool != "DEBUG" and not bool(re.search(r"\d", tool))
    ]

    return {"tools": unique_tools + python_tool_list}
