from manage import app
from eventlet import wsgi, listen

if __name__ == '__main__':
    wsgi.server(listen(('localhost', 5000)), app)