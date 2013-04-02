import twitter
import simplejson
import requests

def GetFavorites(api, user=None, count=None, since=None):
    if user:
      url = 'http://twitter.com/favorites/%s.json' % user
    elif not user and not self._username:
      raise TwitterError("User must be specified if API is not authenticated.")
    else:
      url = 'http://twitter.com/favorites.json'
    parameters = {}
    if since:
      parameters['since'] = since
    json = api._FetchUrl(url, parameters=parameters)
    print json
    return
#    data = simplejson.loads(json)
#    return [Status.NewFromJsonDict(x) for x in data] 

con_key='DI6BKF7Jv01UkIi4emDw'
sec_key='sVj9nqb4TLwSNc8aYnQmP1yApFIqFZ4UNgljk1OXF0'
req_url='https://api.twitter.com/1/'
atoken='37203154-02uqsNevv4ZPklaUvVva9FOafWmeUeqGWrHRPXXlG'
atoken_sec='ERp0WGC3heVVCi6LSpEnkqByIkJ3Zqz4WEZj8XcBo'

api=twitter.Api(consumer_key=con_key,consumer_secret=sec_key,
        access_token_key=atoken, access_token_secret=atoken_sec)

#faves=GetFavorites(api,user='Zhanarochka@gmail.com')
payload={'user':'zhanarochka@gmail.com','count':'100'}
j=api._FetchUrl('https://api.twitter.com/1.1/favorites/list.json',parameters=payload)
f=open("faves_json","wb")
f.write(j)
f.close()

