import sqlite3
from flask import abort
from . import safe_exec, efk_connect as efk_sqlite3
from dbhandler.settings import *
import utility


def set_ticket_state(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    # Get the product/part first.
    query = 'SELECT product,product_part FROM ticket WHERE id=?'
    res = safe_exec.read(conn, query, (kwargs['id'],)).fetchone()
    if res is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')

    # Get the responsible manager.
    product, product_part = res
    if product_part is not None:
        query = 'SELECT manager FROM product_part WHERE id=?'
        manager = safe_exec.read(conn, query, (product_part,)).fetchone()
        if manager is None:
            query = 'SELECT manager FROM product WHERE id=?'
            manager = safe_exec.read(conn, query, (product,)).fetchone()
    else:
        query = 'SELECT manager FROM product WHERE id=?'
        manager = safe_exec.read(conn, query, (product,)).fetchone()

    manager = manager[0]

    print(kwargs['manager'])
    print(manager)

    if kwargs['manager'] != manager:
        conn.close()
        abort(403)

    # Update.
    query = 'UPDATE ticket SET state=? WHERE id=?'
    placeholders = (kwargs['state'], kwargs['id'])
    cur = safe_exec.write(conn, query, placeholders)
    conn.close()


def set_task_state(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    # Neccessary check.
    works_on_task_helper(conn, kwargs['id'], kwargs['t_id'], kwargs['employee'])

    # Update.
    query = 'UPDATE task SET state=? WHERE id=?'
    placeholders = (kwargs['state'], kwargs['t_id'])
    safe_exec.write(conn, query, placeholders)
    conn.close()


def add_time_spend(**kwargs):
    conn = efk_sqlite3.connect(DATABASE)

    # Neccessary check.
    works_on_task_helper(conn, kwargs['id'], kwargs['t_id'], kwargs['employee'])

    # Accumulate time.
    query = 'UPDATE task SET ats=ats+? WHERE id=?'
    try:
        hours = kwargs['hours']
    except:
        hours = 0

    placeholders = (hours, kwargs['t_id'])
    safe_exec.write(conn, query, placeholders)
    conn.close()


def works_on_task_helper(conn, ticket_id, task_id, employee):

    # Check if task exists.
    query = 'SELECT NULL FROM task WHERE ticket=? AND id=?'
    placeholders = (ticket_id, task_id)
    if safe_exec.read(conn, query, placeholders).fetchone() is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'task')

    # Check if employee is working on the task.
    query = 'SELECT NULL FROM working_on_task WHERE task=? AND employee=?'
    placeholders = (task_id, employee)
    if safe_exec.read(conn, query, placeholders).fetchone() is None:
        conn.close()
        abort(403)
