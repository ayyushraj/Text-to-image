from flask import Flask, request, jsonify
import torch
from transformers import StableDiffusionPipeline

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_text():
    # Get the input text from the request
    input_text = request.json['text']

    # Load the model
    modelid = "CompVis/stable-diffusion-v1-4"
    device = "cuda"
    pipe = StableDiffusionPipeline.from_pretrained(modelid, revision="fp16", torch_dtype=torch.float16, use_auth_token=auth_token)
    pipe.to(device)

    # Generate the output text
    output_text = pipe(input_text)

    # Return the output text
    return jsonify({'text': output_text})

if __name__ == '__main__':
    app.run(debug=True)
