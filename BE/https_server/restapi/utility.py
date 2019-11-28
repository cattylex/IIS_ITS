
def read_json_object(row, *keys):
    object = dict()
    for key in keys:
        curr_object[key] = row[key];
    return object;


def add_required_headers(func):
    def inner(*args, **kwargs):
        resp = func(*args, **kwargs)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        print('Hello world')
        return resp
    return inner
