
def read_json_object(row, *keys):
    object = dict()
    for key in keys:
        curr_object[key] = row[key];
    return object;
