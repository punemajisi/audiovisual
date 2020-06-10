from moviepy.editor import *
import os

def av_break():

    for fname in os.listdir():
        clip = VideoFileClip(fname)
        audio = clip.audio
        audio.write_audiofile(fname+"_audio.mp3")
        video = clip.volumex(0)
        video.write_videofile(fname+"_video.mp4")

av_break()
