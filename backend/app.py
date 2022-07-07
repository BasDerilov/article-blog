from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import services

app = Flask(__name__)
CORS(app)

@app.route('/Articles', methods=["GET"])
def get_all_articles():
    article_objs = services.return_all_articles()
    parsed_articles = []
    
    for article in article_objs:
        key_value_pair = {
            'title' : article.title,
            'content' : article.content,
        }
        
        parsed_articles.append(key_value_pair)
    
    return jsonify(parsed_articles)

@app.route('/Articles', methods=['POST'])
def create_article():
    args = request.args.to_dict()
    
    result = services.create_new_article(args['title'], args['content'])
    
    if result:
        return Response(f"Created article {args['title']}", status=200, mimetype='json')
    else:
        return Response(f"Article with the same name already exists!", status=400, mimetype='json')
        

@app.route('/Articles', methods=['DELETE'])
def delete_article():
    args = request.args.to_dict()
    result = services.delete_article(args['title'])
    
    if result:
        return Response(f"Article {args['title']} was removed succesfully", status=200, mimetype='json')
    else:
        return Response(f"Article {args['title']} not found", status=400, mimetype='json')

