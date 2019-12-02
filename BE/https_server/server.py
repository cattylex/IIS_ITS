#!/usr/bin/env python3

import sys, os
SWD = os.path.dirname(sys.argv[0])+'/'
if SWD == '/':
    SWD = ''

sys.path.append(SWD+'../dist-packages') # 3rd party dependencies

from flask import Flask, render_template, send_from_directory
import restapi, dbhandler


# Server app instance.
app = Flask(__name__, template_folder='../webapp')


# Entry point for the browser.
@app.route('/')
def entry_point():
	return render_template('index.html')


# Serve the client app.
@app.route('/webapp/<path:path>')
def send_client(path):
    return send_from_directory(SWD+'../webapp', path)


# Start the server app.
if __name__ == '__main__':

	try:
		PORT = int(sys.argv[1])
	except (ValueError, IndexError):
		print('python3 server.py PORT')
		exit(1)

	# Self-signed certificates for HTTPS.
	context = (SWD+'../ssl/certificate.crt', SWD+'../ssl/private.key')

	dbhandler.init_database()
	restapi.register_url_rules(app)
	restapi.register_error_handlers(app)

	app.run(host='localhost', port=PORT, threaded=True, ssl_context=context)
