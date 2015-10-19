# Abstract Base Task used to ensure we have an 'execute' function that accepts args
# Scheduler will ensure you can only expose a class of this type so that we know what to run.

import abc

class BaseTask(object):
    __metaclass__  = abc.ABCMeta

    @classmethod
    @abc.abstractmethod
    def execute(*args, **kwargs):
        pass
