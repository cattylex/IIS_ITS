#!/usr/bin/env python3

import sys, os
# SWD = os.path.dirname(sys.argv[0])

sys.path.append('../dist-packages') # 3rd party dependencies

from flask import Flask, render_template, send_from_directory
import restapi, dbhandler


# Server app instance.
app = Flask(__name__, template_folder='../webapp')


# Entry point for the browser.
@app.route('/')
def entry_point():
	return render_template('index.html')


# Serve the client app code.
@app.route('/webapp/<path:path>')
def send_client(path):
    return send_from_directory('../webapp', path)


# Serve the client app images.
@app.route('/assets/<path:path>')
def send_client_assets(path):
    return send_from_directory('../webapp/assets', path)


# Start the server app.
if __name__ == '__main__':

	try:
		HOST, _, PORT = sys.argv[1].rpartition(':')
		PORT = int(PORT)
		if HOST == '':
			raise ValueError

	except (ValueError, IndexError):
		print('python3 server.py <host:port>')
		exit(1)

	# Self-signed certificates for HTTPS.
	context = ('../ssl/certificate.crt', '../ssl/private.key')

	dbhandler.init_database()
	restapi.register_url_rules(app)
	restapi.register_error_handlers(app)

	app.run(host=HOST, port=PORT, threaded=True, ssl_context=context)
