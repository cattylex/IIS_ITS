#!/usr/bin/env python3

import sys
sys.path.append('../dist-packages') # 3rd party dependencies

from flask import Flask

import restapi
import dbhandler

if __name__ == '__main__':

	try:
		PORT = int(sys.argv[1])
	except (ValueError, IndexError):
		print('python3 server.py PORT')
		exit(1)

	# HTTPS
	context = ('../ssl/certificate.crt', '../ssl/private.key')

	app = Flask(__name__)
	dbhandler.init_database()
	restapi.register_url_rules(app)

	app.run(host='localhost', port=PORT, threaded=True) # ssl_context=context)
