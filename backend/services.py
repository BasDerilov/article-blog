import pickle
from os import chdir, listdir, mkdir, remove
from models import Article

directory = 'data/'
try:
    mkdir('data')
except:
    pass
    
chdir(directory)

def return_all_articles():
    files = listdir()
    articles = []
    
    try:
        for file in files:
        
            file_stream = open(file, 'rb')
            articles.append(pickle.load(file_stream))
    except:
        return False
    else:
        return articles
    
def create_new_article(title, content):
    article_obj = Article(title, content)
    
    try:
        pickle.dump(article_obj, open(article_obj.title, 'xb')) 
    except:
        return False
    else:
        return True

def delete_article(title):
    try:
        remove(title)
    except:
        return False
    else:
        return True
        



# examp = Article('Some stifda', 'World')
# create_new_article(examp)
# print(return_all_articles())