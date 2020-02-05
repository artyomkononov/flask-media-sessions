#from tinytag import TinyTag
import glob
import config
import os


def getTagsForTrack(trackFullPath):
    trackInfDict = dict()

    trackInfDict['src'] = trackFullPath.replace('static','').replace('\\','/').replace('//','/')

    trackInfDict['title'] = os.path.basename(trackFullPath).split('-')[1].strip()
    trackInfDict['artist'] = os.path.basename(trackFullPath).split('-')[0].strip()

    return trackInfDict


# def getTagsForTrack2(trackFullPath):
#     trackInfDict = dict()

#     trackInfDict['src'] = trackFullPath.replace('static','').replace('\\','/').replace('//','/')
    
#     tag = TinyTag.get(trackFullPath)
#     trackInfDict['title'] = tag.title
#     trackInfDict['artist'] = tag.artist

#     if trackInfDict.get('title') is None:
#         trackInfDict['title'] = 'titleNone'
#     if trackInfDict.get('artist') is None:
#         trackInfDict['artist'] = 'artistNone'
    
#     return trackInfDict


def buildPlaylistForJS():

    returnList = list()

    for i in glob.glob(config.musicPath + '*'):

        returnList.append(getTagsForTrack(i))

    return returnList