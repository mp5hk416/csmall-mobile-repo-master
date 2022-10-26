#/usr/bin/env python
# -*- coding:utf-8 -*-
# Author:Wangj
import os
import time
import re

basedir = './'
filelists = []
# 指定想要统计的文件类型
whitelist = ['html', 'js', 'vue']
blacklist = [r'node_modules', r'dist', r'miniprogram_npm', r'assets', r'utils', r'libs']
#遍历文件, 递归遍历文件夹中的所有
def getFile(basedir):
    global filelists
    for parent,dirnames,filenames in os.walk(basedir):
        for filename in filenames:
            ext = filename.split('.')[-1]
            in_blacklist = False
            for blackstr in blacklist:
                if re.search(blackstr, parent):
                    in_blacklist = True
                    break
            #只统计指定的文件类型，略过一些log和cache文件
            if in_blacklist:
                break

            if ext in whitelist:
                filelists.append(os.path.join(parent,filename))
#统计一个文件的行数
def countLine(fname):
    count = 0
    for file_line in open(fname, encoding='utf-8').readlines():
        if file_line.strip() != '' and file_line.strip() != '\n': #过滤掉空行
            count += 1
    print (fname + '----' , count)
    return count


if __name__ == '__main__' :
    startTime = time.clock()
    getFile(basedir)
    totalline = 0
    for filelist in filelists:
        totalline = totalline + countLine(filelist)
    print ('total lines:',totalline)
print ('Done! Cost Time: %0.2f second' % (time.clock() - startTime))