##Overview

In this project, we used two datasets: dataset(2009) and dataset(2011). dataset(2009) was original collected by [here](http://an.kaist.ac.kr/traces/WWW2010.html), which contains the graph structure that collected at 2009. dataset(2011) was original collected by [here](https://wiki.cites.illinois.edu/wiki/display/forward/Dataset-UDI-TwitterCrawl-Aug2012?src=search), which contains 284 million following relationships, 3 million user profiles and 50 million tweets. The dataset was collected at May 2011.

We combined these two datasets, using the graph structure in dataset(2009) and the user profiles and tweets in dataset(2011).

##Creation

The creator of dataset(2009) claimed that they crawled the entire graph of Twitter by [Twitter API](https://dev.twitter.com/docs/api/1.1) in 2009.

Dataset(2011) was also collected by [Twitter API](https://dev.twitter.com/docs/api/1.1). First the creators random selected 100,000 users as seeds to crawl users' following relationships. They then crawled 284 million following relationships among 20 million users. From the 2 million users, they selected 3 million users, who have at least 10 relationships in the dataset, to crawl their user profiles. After crawling their profiles, they selected about 150 thousand users, who have their locations in their profiles, from the 3 million users to crawl their public tweets. For each user, they crawled at most 500 tweets.

##Data Files

| File              | Description           | Download  |
| ----------------- |--------------- | ------ |
| 2009 Graph Network | 200 million users following relationships at 2011 | [link](http://an.kaist.ac.kr/~haewoon/release/twitter_social_graph/twitter_rv.tar.gz) |
| 2011 Graph Network | 200 million users following relationships at 2011 | [link](http://forward.cs.illinois.edu/datasets/UDI/UDI-TwitterCrawl-Aug2012-Network.zip) |
| User Profiles     | 3 million users profiles | [link](http://forward.cs.illinois.edu/datasets/UDI/UDI-TwitterCrawl-Aug2012-Profiles.zip) |
| User Tweets       | 50 million tweets for 140 thousand users | [link](http://forward.cs.illinois.edu/datasets/UDI/UDI-TwitterCrawl-Aug2012-Tweets.zip) |

##Collecting Spammers in Twitter
To use supervised learning method to detecting spammers, we first need some labeled spammer data. Here we used suspended user list as labeled spammers. These accounts are usually suspended because they violated the [Twitter Rules](https://support.twitter.com/articles/18311-the-twitter-rules), in which most are due to spam activities. We collected the accounts which satisfy:

* Account is suspended
* User Id is in dataset(2009)
* Tweets he posted are in dataset(2011)

and finally 3,045 users are collected. This list can be downloaded [here](/static/suspended.txt).

##Preparing Data for Classification
Next step of this project is to classify spammers by training a model based on labeled data. The training data contains two part: one is spammer collection, another is non-spammer collection. Spammer collection was described in the previous part. For non-spammer collection, we random sampled some arbitrary users from the whole dataset which satisfy:

* This user should be in dataset(2009) and dataset(2011)
* The tweets he posted should be in dataset(2011)
* This user should not be on suspended list

and finally 3,034 users are collected.

Then we converted these two collections into [ARFF file format](http://www.cs.waikato.ac.nz/ml/weka/arff.html), which can be imported by [Weka](http://www.cs.waikato.ac.nz/ml/weka/arff.html). Weka is one of the most popular open source machine learning toolkit in the world, which provides lots of functions such as classification, clustering and feature selection. The features we used here is:

* fraction of tweets with URLs
* fraction of followers per friends
* number of retweet by others
* number of friends
* number of followers
* average number of hashtags per tweet
* number of increment of followers during these 2 years
* number of increment of friends during these 2 years

This ARFF file can be downloaded [here](/static/train.arff).