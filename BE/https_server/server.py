#!/usr/bin/env python3

import sys
sys.path.append('../dist-packages') # 3rd party dependencies

from flask import Flask

import restapi
import dbhandler

if __name__ == '__main__':
	# HTTPS
	context = ('../ssl/certificate.crt', '../ssl/private.key')

	dbhandler.insert_helper()

	app = Flask(__name__)

	restapi.register_url_rules(app)

	app.run(host='localhost', port=int(sys.argv[1]), threaded=True) # ssl_context=context)
