import os
import requests

MANAGEMENT_KEY = os.environ.get("OPENROUTER_MANAGEMENT_KEY")

url = "https://openrouter.ai/api/v1/credits"
headers = {"Authorization": f"Bearer {MANAGEMENT_KEY}"}
try:
    response = requests.get(url, headers=headers)
    
    # If the key works, calculate and print ONLY the number
    if response.status_code == 200:
        data = response.json().get("data", {})
        remaining_balance = data.get("total_credits", 0) - data.get("total_usage", 0)
        print(f"${remaining_balance:.2f}")
    
    # Catching the mock key error gracefully
    else:
        print(f"API Error (Expected for a mock key): Status Code {response.status_code}")
        print(f"Message: {response.text}")
        
except Exception as e:
    print(f"Python/Network Error: {e}")
