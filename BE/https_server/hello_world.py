#!/usr/bin/env python3

import sys
sys.path.append('../dist-packages') # 3rd party dependencies

from flask import Flask
import views

# HTTPS
context = ('ssl/certificate.crt', 'ssl/private.key')

if __name__ == '__main__':
    app = Flask(__name__)

    # Register views.
    app.add_url_rule('/', view_func=views.hello_world, methods=['GET'])

    app.run(host='localhost', port=443, threaded=True, ssl_context=context)
