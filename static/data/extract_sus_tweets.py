#!/usr/bin/python
import sys
import re

TWEET_END = re.compile(r'\s*</entry>\s*')
CONTENT_MATCHER = re.compile(r'\s*<entry>\s*<\w+>(.+?)<.*>.+')


def extract(fname):
    with open(fname) as fin:
        with open(fname + '.extracted', 'w') as fout:
            buf = ''
            for i, l in enumerate(fin.xreadlines()):
                if i % 100000 == 0 and i != 0:
                    print 'Extracted', i, ' lines'

                l = l.strip()
                buf += l

                if TWEET_END.match(l):
                    m = CONTENT_MATCHER.search(buf)
                    if not m:
                        print 'Error finding content in',  buf
                        return

                    content = m.group(1)
                    fout.write(content + '\n')
                    buf = ''


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print 'USAGE: ./extract_sus_tweets.py TWEET_SUBSET_FILENAME'
    else:
        extract(sys.argv[1])
