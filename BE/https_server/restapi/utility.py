
def row_to_json(row):
    object = dict()
    for key in row.keys():
        object[key] = row[key];
    return object;


def add_required_headers(func):
    def inner(*args, **kwargs):
        resp = func(*args, **kwargs)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp
    return inner
