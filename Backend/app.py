from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

def generate_user_id(full_name, dob):
    formatted_dob = datetime.strptime(dob, "%d-%m-%Y").strftime("%d%m%Y")
    user_id = f"{full_name.replace(' ', '_').lower()}_{formatted_dob}"
    return user_id

@app.route('/bfhl', methods=['POST'])
def handle_post():
    try:
        # Extract user information and data from the request
        full_name = request.json.get('full_name', 'soham_mandal')  # default name
        dob = request.json.get('dob', '14-10-2003')  # default dob
        data = request.json.get('data', [])
        
        if not isinstance(data, list):
            raise ValueError("Data should be a list")

        # Generate dynamic user_id
        user_id = generate_user_id(full_name, dob)

        # User details
        email = request.json.get('email', 'soham@example.com')
        roll_number = request.json.get('roll_number', 'ABCD123')

        # Separate numbers and alphabets
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]

        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets, default="") if lowercase_alphabets else ""

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"is_success": False, "error": str(e)}), 400

@app.route('/bfhl', methods=['GET'])
def handle_get():
    return jsonify({"operation_code": 1}), 200

if __name__ == '__main__':
    app.run(debug=True)
