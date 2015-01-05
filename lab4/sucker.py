'''this time it comes to
big sucker game'''

import json

import re

import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

STA_DIR = os.path.join(os.path.dirname(__file__), "static")

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    '''the IndexHandler
    of my sucker_main'''
    def get(self):
        self.render('buyagrade.html')

class SuckerHandler(tornado.web.RequestHandler):
    '''the IndexHandler
    of my sucker_handler'''
    def post(self):
        __sucker = {
            'name' : self.get_argument('Name', None),
            'section' : self.get_argument('Section', None),
            'card_ID' : self.get_argument('Card_ID', None),
            'card_type' : self.get_argument('Card_type', None)
        }
        if not(__sucker['name'] and __sucker['section'] and
               __sucker['card_ID'] and __sucker['card_type']):
            __message = 'You didn\'t not fill out the form completely'
            self.render('sorry.html',
                        message=__message)
        elif not re.match(r'^(\d{4}\D?){4}$', __sucker['card_ID']):
            __message = 'You didn\'t provide a valid card number'
            self.render('sorry.html',
                        message=__message)
        elif ((__sucker['card_type'] == 'visa' and
               __sucker['card_ID'][0] != '4') or
              (__sucker['card_type'] == 'mastercard' and
               __sucker['card_ID'][0] != '5')):
            __message = 'You didn\'t provide a valid card number'
            self.render('sorry.html',
                        message=__message)
        else:
            __sucker['card_ID'] = ''.join(re.split(r'\D', __sucker['card_ID']))
            sucker_in = json.dumps(__sucker)
            with open(os.path.join(os.path.dirname(__file__),\
                      'templates', 'suckers.txt'), 'a') as file_:
                file_.writelines((sucker_in, '\n'))
            with open(os.path.join(os.path.dirname(__file__),\
                      'templates', 'suckers.txt')) as file_:
                records = [json.loads(line) for line in file_.readlines()]
            self.render('sucker.html',
                        sucker=__sucker,
                        records=records)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    APP = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/sucker', SuckerHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )
    HTTP_SERVER = tornado.httpserver.HTTPServer(APP)
    HTTP_SERVER.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
