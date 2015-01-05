'''my first shoot in python
and tornado'''

import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

from tornado.options import define, options
define("port", default=8888, help="run on the given port", type=int)

FILE = os.path.join(os.path.dirname(__file__), "static", "songs")

class IndexHandler(tornado.web.RequestHandler):
    '''the IndexHandler
    of my musiclist'''
    def get(self):
        all_list = os.listdir(FILE)
        playlist = self.get_argument("playlist", "none")
        if playlist != 'none':
            with open(os.path.join(FILE, playlist), 'r') as file_:
                songlist = file_.readlines()
            __songs = [x.strip() for x in songlist if x.find(".mp3") >= 0]
            __sizes = [os.path.getsize(os.path.join(FILE, i)) for i in __songs]
            __playlists = []
            self.render('music.html',
                        songs=__songs,
                        sizes=__sizes,
                        playlists=__playlists)
        else:
            __songs = [x for x in all_list if x.find(".mp3") >= 0]
            __playlists = [x for x in all_list if x.find(".txt") >= 0]
            __sizes = [os.path.getsize(os.path.join(FILE, i)) for i in __songs]
            self.render('music.html',
                        songs=__songs,
                        sizes=__sizes,
                        playlists=__playlists)

if __name__ == '__main__':
    tornado.options.parse_command_line()
    APP = tornado.web.Application(
        handlers=[(r'/', IndexHandler), (r'/music.html', IndexHandler)],
        template_path=os.path.join(os.path.dirname(__file__), "templates"),
        static_path=os.path.join(os.path.dirname(__file__), "static")
    )
    HTTP_SERVER = tornado.httpserver.HTTPServer(APP)
    HTTP_SERVER.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
