from flask import abort

def send_error(err_id, detail):
    abort(err_id, detail)
