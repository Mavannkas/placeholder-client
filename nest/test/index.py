import requests

url = "https://microsoft-translator-text.p.rapidapi.com/BreakSentence"

querystring = {"api-version":"3.0"}

payload = "[\r{\r \"Text\": \"How are you? I am fine. What did you do today?\"\r}\r]"
headers = {
    'content-type': "application/json",
    'x-rapidapi-key': "152c60f7c5mshd1409088004e316p1c396ejsn2da11731a926",
    'x-rapidapi-host': "microsoft-translator-text.p.rapidapi.com"
    }

response = requests.request("POST", url, data=payload, headers=headers, params=querystring)

print(response.text)