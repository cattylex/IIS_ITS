import sqlite3
from flask import abort
from . import safe_exec
from dbhandler.settings import *
import utility


def set_ticket_state(**kwargs):
    conn = sqlite3.connect(DATABASE)

    # Get the product/part first.
    query = 'SELECT product,product_part FROM ticket WHERE id=?'
    res = safe_exec.read(conn, query, (kwargs['id'],)).fetchone()
    if res is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'ticket')

    # Get the responsible manager.
    product, product_part = res
    if product_part is not None:
        query = 'SELECT pp.manager,p.manager FROM product_part JOIN product ON pp.product=p.id WHERE pp.id=? OR p.id=?'
        placeholders = (product_part, product)
        ppman, pman = safe_exec.read(conn, query, placeholders).fetchone()
        manager = ppman if ppman is not None else pman # Prioritize product part manager.

    if kwargs['manager'] != manager:
        conn.close()
        abort(403)

    # Update.
    query = 'UPDATE ticket SET state=? WHERE id=?'
    placeholders = (kwargs['state'], kwargs['id'])
    cur = safe_exec.write(conn, query, placeholders)
    conn.close()


def set_task_state(**kwargs):
    conn = sqlite3.connect(DATABASE)

    # Neccessary check.
    works_on_task_check_helper(conn, kwargs['id'], kwargs['t_id'], kwargs['employee'])

    # Update.
    query = 'UPDATE task SET state=? WHERE id=?'
    placeholders = (kwargs['state'], kwargs['t_id'])
    safe_exec.write(conn, query, placeholders)
    conn.close()


def add_time_spend(**kwargs):
    conn = sqlite3.connect(DATABASE)

    # Neccessary check.
    works_on_task_check_helper(conn, kwargs['id'], kwargs['t_id'], kwargs['employee'])

    # Accumulate time.
    query = 'UPDATE task SET ast=ast+? WHERE id=?'
    placeholders = (kwargs['hours'], kwargs['t_id'])
    safe_exec.write(conn, query, placeholders)
    conn.close()


def works_on_task_check_helper(conn, ticket_id, task_id, employee):

    # Check if task exists.
    query = 'SELECT NULL FROM task WHERE ticket=? AND id=?'
    placeholders = (kwargs['id'], kwargs['t_id'])
    if safe_exec.read(conn, query, placeholders).fetchone() is None:
        conn.close()
        abort(404, utility.ERR_FMTS['NOT_FOUND']%'task')

    # Check if employee is working on the task.
    query = 'SELECT NULL FROM working_on_task WHERE task=? AND employee=?'
    placeholders = (kwargs['t_id'], kwargs['employee'])
    if safe_exec.read(conn, query, placeholders).fetchone() is None:
        conn.close()
        abort(403)


# TODO: here some super heroic special query for the main page