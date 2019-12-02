# Convert sqlite row to dict.
def row_to_json(row):
    object = dict()
    for key in row.keys():
        object[key] = row[key];
    return object;


# Add required headers to the response decorator.
def add_required_headers(func):
    def inner(*args, **kwargs):
        resp = func(*args, **kwargs)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    return inner


# Format strings for error messages.
ERR_FMTS = {
    'NOT_FOUND'     : '%s does not exist',
    'BAD_MIME'      : '%s payload expected',
    'EMPTY_UPDATE'  : 'empty update of %s'
}
