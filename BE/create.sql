CREATE TABLE ticket (
    id INTEGER PRIMARY KEY,
    product INTEGER NOT NULL,
    product_part INTEGER,
    author INTEGER NOT NULL,
    name TEXT,
    descr TEXT,
    state TEXT,
    created TIMESTAMP,

-- pridat autora ticketu
    FOREIGN KEY (product) REFERENCES product(id),
    FOREIGN KEY (product_part) REFERENCES product_part(id),
    FOREIGN KEY (author) REFERENCES user(id)
);

CREATE TABLE product (
    id INTEGER PRIMARY KEY,
    manager INTEGER NOT NULL,
    name TEXT,
    desrc TEXT,

    FOREIGN KEY (manager) REFERENCES user(id)
);

CREATE TABLE product_part (
    id INTEGER PRIMARY KEY,
    product INTEGER NOT NULL,
    manager INTEGER, -- When NULL, manager is product manager.
    name TEXT,
    desrc TEXT,

    FOREIGN KEY (product) REFERENCES product(id),
    FOREIGN KEY (manager) REFERENCES user(id)
);

CREATE TABLE task (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    author INTEGER NOT NULL,
    name TEXT,
    descr TEXT,
    state TEXT,
    ewt INTEGER, -- estimted working time
    ats INTEGER, -- actual time spend
    created TIMESTAMP,

    FOREIGN KEY (author) REFERENCES user(id),
    FOREIGN KEY (ticket) REFERENCES ticket(id)
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    name TEXT,
    mail TEXT,
    login TEXT,
    password TEXT,
    type TEXT,

    CHECK (type IN ('customer', 'employee', 'manager', 'executive', 'admin'))
);

CREATE TABLE comment (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    author INTEGER NOT NULL,
    content TEXT,
    created TIMESTAMP,

    FOREIGN KEY (ticket) REFERENCES ticket(id),
    FOREIGN KEY (author) REFERENCES user(id)
);

CREATE TABLE working_on_task (
    employee INTEGER NOT NULL,
    task INTEGER NOT NULL,

    FOREIGN KEY (employee) REFERENCES user(id),
    FOREIGN KEY (task) REFERENCES task(id),
    PRIMARY KEY (employee, task)
);

CREATE TABLE picture (
		id INTEGER PRIMARY KEY,
    picture BLOB
);

-- Index for user.
CREATE INDEX user_type_index ON user(type);

INSERT INTO ticket
VALUES (1, 242, 0, 444, 'ticket1', 'lorum ipsem a neviem ako sa to pise', 'CREATED', '1998-08-07 16:54:32');

INSERT INTO ticket
VALUES (2, 56, 60, 69, 'ticket2', 'lorum ipsem dva a dva je asi styri.', 'IN PROGRESS', '5668-48-02 99:55:67');
