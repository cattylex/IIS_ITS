CREATE TABLE ticket (
    id INTEGER PRIMARY KEY,
    product INTEGER NOT NULL,
    product_part INTEGER,
    author INTEGER NOT NULL,
    name TEXT,
    descr TEXT,
    state TEXT NOT NULL,
    created TIMESTAMP NOT NULL,

    FOREIGN KEY (product) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (product_part) REFERENCES product_part(id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES user(id) ON DELETE CASCADE
    CHECK (state IN ('OPEN', 'IN PROGRESS', 'CLOSED', 'REJECTED'))
);

CREATE TABLE product (
    id INTEGER PRIMARY KEY,
    author INTEGER NOT NULL,
    manager INTEGER,
    name TEXT,
    descr TEXT,

    FOREIGN KEY (author) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (manager) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE product_part (
    id INTEGER PRIMARY KEY,
    product INTEGER NOT NULL,
    author INTEGER NOT NULL,
    manager INTEGER, -- When NULL, manager is product manager.
    name TEXT,
    descr TEXT,

    FOREIGN KEY (product) REFERENCES product(id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (manager) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE task (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    author INTEGER NOT NULL,
    name TEXT,
    descr TEXT,
    state TEXT,
    ewt REAL, -- estimted working time
    ats REAL, -- actual time spend
    created TIMESTAMP NOT NULL,

    FOREIGN KEY (author) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (ticket) REFERENCES ticket(id) ON DELETE CASCADE,
    CHECK (state IN ('OPEN', 'IN PROGRESS', 'CLOSED'))
);

CREATE TABLE user (
    id INTEGER PRIMARY KEY,
    name TEXT,
    mail TEXT,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    type TEXT NOT NULL,

    CHECK (type IN ('customer', 'employee', 'manager', 'executive', 'admin'))
);

CREATE TABLE comment (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    author INTEGER NOT NULL,
    content TEXT  NOT NULL,
    created TIMESTAMP NOT NULL,

    FOREIGN KEY (ticket) REFERENCES ticket(id) ON DELETE CASCADE,
    FOREIGN KEY (author) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE working_on_task (
    employee INTEGER NOT NULL,
    task INTEGER NOT NULL,

    FOREIGN KEY (employee) REFERENCES user(id)  ON DELETE CASCADE,
    FOREIGN KEY (task) REFERENCES task(id)  ON DELETE CASCADE,
    PRIMARY KEY (employee, task)
);

CREATE TABLE picture (
    id INTEGER PRIMARY KEY,
    ticket INTEGER NOT NULL,
    ext CHAR(10) NOT NULL,
    data BLOB NOT NULL,

    FOREIGN KEY (ticket) REFERENCES ticket(id)  ON DELETE CASCADE
);

-- Index for user.
CREATE INDEX user_type_index ON user(type);

-- Insert ADMIN
INSERT INTO user (login, password, type)
VALUES ('admin', '12345', 'admin');
