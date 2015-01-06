'''this time it comes to
different kind of movies'''

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
    of my movielist'''
    def get(self):
        __movie_name = self.get_argument('film', 'tmnt')
        print __movie_name
        __movie_path = os.path.join(os.path.dirname(__file__), "static",
                                    __movie_name)
        __movie_info = os.listdir(__movie_path)
        with open(os.path.join(os.path.dirname(__file__), "static",
                               __movie_name, "info.txt"), 'r') as file_:
            __info = file_.readlines()
        __mtitle = [__info[0].strip(), __info[1].strip()]
        __treview = [__info[2].strip(), __info[3].strip()]
        if int(__treview[0]) >= 60:
            __reicon = 'Fresh'
        else:
            __reicon = 'Rotten'
        with open(os.path.join(os.path.dirname(__file__), "static",
                               __movie_name,
                               "generaloverview.txt"), 'r') as file_:
            __go_views = file_.readlines()
        __go_view = [x.split(':') for x in __go_views]
        __per_review1 = []
        __per_review2 = []
        __review_list = [x for x in __movie_info if x.find('review') >= 0]
        length = len(__review_list)
        count = 1
        for item in __review_list:
            with open(os.path.join(os.path.dirname(__file__), "static",
                                   __movie_name, item), 'r') as file_:
                __review = file_.readlines()
            if count <= (length/2):
                __per_review1.append([__review[0].strip('\n'),
                                      __review[1].strip('\n'),
                                      __review[2].strip('\n'),
                                      __review[3].strip('\n')])
            else:
                __per_review2.append([__review[0].strip('\n'),
                                      __review[1].strip('\n'),
                                      __review[2].strip('\n'),
                                      __review[3].strip('\n')])
            count = count+1
        print len(__per_review1), len(__per_review2)
        print __per_review1, __per_review2
        self.render('movie.html',
                    go_view=__go_view,
                    mtitle=__mtitle,
                    treview=__treview,
                    reicon=__reicon,
                    per_review1=__per_review1,
                    per_review2=__per_review2,
                    film=__movie_name,
                    rv_length=length)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    APP = tornado.web.Application(
        handlers=[(r'/', IndexHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
    )
    HTTP_SERVER = tornado.httpserver.HTTPServer(APP)
    HTTP_SERVER.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
