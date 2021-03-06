# APScheduler API

Provides a RESTful interface to Advanced Python Scheduler ([APScheduler]), using [Flask] and [Flask RESTful].  Additionally, a front-end web UI is provided, and is written in AngularJS.

Originally, this was written as a beginning to a PVR application, but I've split this into it's own API since I thought it might be of some use to someone else.

** WARNING: ** This is still in early development, and not production ready.

[APScheduler]: http://apscheduler.readthedocs.org
[Flask]: http://flask.pocoo.org/
[Flask Restful]: http://flask-restful-cn.readthedocs.org/en/0.3.4/

## Getting Started
To start using the API, simply clone this repository and run:

    $ pip install -r requirements.txt
    $ python api.py

And then visit the provided AngularJS interface at `http://localhost:5000`

See the [API Documentation](API.md)

## License

Released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
