from manage import app
from eventlet import wsgi, listen

if __name__ == '__main__':
    wsgi.server(listen(('0.0.0.0', 5000)), app)