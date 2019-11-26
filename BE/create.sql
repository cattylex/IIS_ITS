CREATE TABLE ticket (
    id INTEGER PRIMARY KEY,
    product INTEGER NOT NULL,
    product_part INTEGER,
    name TEXT,
    descr TEXT,
    state TEXT,

    FOREIGN KEY (product) REFERENCES product(id),
    FOREIGN KEY (product_part) REFERENCES product_part(id)
);

CREATE TABLE product (
    id INTEGER PRIMARY KEY,
    manager INTEGER NOT NULL,
    name TEXT,
    -- TODO add other attributes

    FOREIGN KEY (manager) REFERENCES user(id)
);

CREATE TABLE product_part (
    id INTEGER PRIMARY KEY,
    product INTEGER NOT NULL,
    manager INTEGER NOT NULL,
    -- TODO add other attributes

    FOREIGN KEY (product) REFERENCES product(id),
    FOREIGN KEY (manager) REFERENCES user(id)
);

CREATE TABLE task (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    descr TEXT,
    state TEXT,
    ewt TEXT,
    ats TEXT,

    FOREIGN KEY (ticket) REFERENCES ticket(id)
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    name TEXT,
    mail TEXT,
    nick TEXT,
    password TEXT,
    type TEXT,

    CHECK (type IN ('customer', 'employee', 'manager', 'executive', 'admin'))
);

CREATE TABLE comment (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    author INTEGER NOT NULL,
    content TEXT,

    FOREIGN KEY (ticket) REFERENCES ticket(id),
    FOREIGN KEY (author) REFERENCES user(id)
);

CREATE TABLE working_on_task (
    employee INTEGER NOT NULL,
    task INTEGER NOT NULL,
    PRIMARY KEY (employee, task)
);
