# This is a sample implementation of TaskBase
from . import BaseTask

class Example(BaseTask):

    @classmethod
    def execute(cls, *args):
        print locals() # print some debug info out
        # TODO: Actual implementation to start recorder
        return

# Register the example as a BaseTask
BaseTask.register(Example)
