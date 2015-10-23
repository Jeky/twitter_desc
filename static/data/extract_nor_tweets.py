#!/usr/bin/python
import sys
import re
import glob
import os

CONTENT_MATCHER = re.compile(r'Origin:(.+?)Text:')
OUTPUT_DIR = 'non-suspended-tweets/'

def extract(fname):
    uid = fname[fname.rfind('/') + 1:]

    buf = ''
    start = False

    with open(fname) as fin:
        with open(OUTPUT_DIR + uid, 'w') as fout:
            content = ' '.join([l.strip() for l in fin.readlines()])

            for c in CONTENT_MATCHER.findall(content):
                fout.write(c + '\n')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print 'USAGE: ./extract_nor_tweets.py TWEET_DIR'
    else:
        if not os.path.exists(OUTPUT_DIR):
            os.mkdir(OUTPUT_DIR)
        for i, f in enumerate(glob.glob(sys.argv[1] + '/*')):
            if i % 1000 == 0:
                print 'extracted', i, 'users'

            extract(f)
