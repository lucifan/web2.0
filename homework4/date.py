'''try to improve your
skill and speed'''

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
    of my index'''
    def get(self):
        self.render('index.html')

class ResultsHandler(tornado.web.RequestHandler):
    '''the IndexHandler
    of my results_handler'''
    def post(self):
        __single = {
            'name' : self.get_argument('name', None),
            'gender' : self.get_argument('gender', None),
            'age' : self.get_argument('age', None),
            'p_type' : self.get_argument('p_type', None),
            'fos' : self.get_argument('fos', None),
            's_gender' : self.get_arguments('s_gender', None),
            'min_age' : self.get_argument('min_age', None),
            'max_age' : self.get_argument('max_age', None)
        }
        if not __single['name']:
            _message = 'You did not provide valid name'
            self.render('sorry.html',
                        message=_message)
        elif not (re.match(r'[0-9]?[0-9]', __single['age']) and
                  int(__single['age']) >= 0 and
                  int(__single['age']) <= 99):
            _message = 'You did not provide valid age'
            self.render('sorry.html',
                        message=_message)
        elif not ((__single['p_type'][0] == 'I' or
                   __single['p_type'][0] == 'E') and
                  (__single['p_type'][1] == 'N' or
                   __single['p_type'][1] == 'S') and
                  (__single['p_type'][2] == 'F' or
                   __single['p_type'][2] == 'T') and
                  (__single['p_type'][3] == 'J' or
                   __single['p_type'][3] == 'P')):
            _message = 'You did not provide valid personality'
            self.render('sorry.html',
                        message=_message)
        elif not ((re.match(r'[0-9]?[0-9]', __single['min_age']) and
                   int(__single['min_age']) >= 0 and
                   int(__single['min_age']) <= 99) and
                  (re.match(r'[0-9]?[0-9]', __single['max_age']) and
                   int(__single['max_age']) >= 0 and
                   int(__single['max_age']) <= 99) and
                  (int(__single['min_age']) <=
                   int(__single['max_age']))):
            _message = 'You did not provide valid seeking'
            self.render('sorry.html',
                        message=_message)
        else:
            __single['s_gender'] = ''.join(__single['s_gender'])
            with open(os.path.join(os.path.dirname(__file__),\
                      'templates', 'singles.txt'), 'r') as file_:
                __users = file_.readlines()
            __user = [x.split(',') for x in __users]
            r_people = []
            for x in __user:
                accept = False
                score = int(0)
                if (x[5].find(__single['gender']) >= 0) and\
                   (__single['s_gender'].find(x[1]) >= 0):
                    accept = True
                if int(__single['age']) >= int(x[6]) and\
                   int(__single['age']) <= int(x[7]) and\
                   int(x[2]) >= int(__single['min_age']) and\
                   int(x[2]) <= int(__single['max_age']):
                    score = score+1
                if __single['fos'] == x[4]:
                    score = score+2
                for i in __single['p_type']:
                    if x[3].find(i) >= 0:
                        score = score+2
                        break
                x.append(score)
                photo = False
                img_path = os.path.join(STA_DIR, 'images')
                photos = os.listdir(img_path)
                for item in photos:
                  if item.find(x[0].replace(' ', '_').lower()) >= 0:
                    photo = True
                x.append(photo)
                if accept == True and score >= 3:
                    r_people.append(x)
            print 'here'
            with open(os.path.join(os.path.dirname(__file__),\
                      'templates', 'singles.txt'), 'a+') as file_:
                file_.writelines(('\n', ','.join([__single['name'],
                                                  __single['gender'],
                                                  __single['age'],
                                                  __single['p_type'],
                                                  __single['fos'],
                                                  __single['s_gender'],
                                                  __single['min_age'],
                                                  __single['max_age']])))
            if self.request.files:
              images_path = os.path.join(os.path.dirname(__file__), "static",
                                         "images")
              photo = self.request.files['photo']
              for meta in photo:
                  filename = __single['name'].lower()+'.jpg'
                  filepath = os.path.join(images_path, filename)
                  with open(filepath, 'wb') as file_:
                      file_.write(meta['body'])
            self.render('results.html',
                        r_people=r_people)


if __name__ == '__main__':
    tornado.options.parse_command_line()
    APP = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/results', ResultsHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        debug=True
    )
    HTTP_SERVER = tornado.httpserver.HTTPServer(APP)
    HTTP_SERVER.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
