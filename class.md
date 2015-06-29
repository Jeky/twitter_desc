## Introduction

The main step of this project is to classify spammers by training a model based on labeled data. The training data contains two part: one is spammer collection, another is non-spammer collection. Spammer collection was described in the previous part. For non-spammer collection, we random sampled some arbitrary users from the whole dataset which satisfy:

* This user should be in dataset(2009) and dataset(2011)
* The tweets he posted should be in dataset(2011)
* This user should not be on suspended list

and finally 3,034 users are collected.


## Classification by Basic Feature Set

We converted these two collections into [ARFF file format](http://www.cs.waikato.ac.nz/ml/weka/arff.html), which can be imported by [Weka](http://www.cs.waikato.ac.nz/ml/weka/arff.html). Weka is one of the most popular open source machine learning toolkit in the world, which provides lots of functions such as classification, clustering and feature selection. The features we used here is:

* fraction of tweets with URLs
* fraction of followers per friends
* number of retweet by others
* number of friends
* number of followers
* average number of hashtags per tweet
* number of increment of followers during these 2 years
* number of increment of friends during these 2 years

This ARFF file can be downloaded [here](/static/train.arff).

After tried some classifiers on this dataset, we achieved the accuracy of 57%, by using JRip classifier.

## Introducing the Tweet Feature Set
The tweets of users are the most important feature here, which can directly indicate whether this user is a spammer. So the next step is to merge tweet features and basic features. For each tweet a user posted, we **tokenized** it, **normalized** the words, **removed stopwords** and at last made grams based on the word list. We tried to make Unigram, Bigram and Trigram and classified the users based on merged feature set. The following table shows the result:
 
|        | Accuracy | F1      | Recall  | Precision |
|--------|----------|---------|---------|-----------|
|Unigram | 53.81%   | 63.30%  | 79.54%  | 52.57%    |
|Bigram  | 55.90%   | 56.97%  | 58.29%  | 55.71%    |
|Trigram | 53.46%   | 37.91%  | 28.37%  | 57.14%    |


## Feature Selection

To improve the result of classification, we tried feature selection methods on the dataset. We used Mutual Information and $\chi^2$ methods, the formula of which are shown below:

Mutual Information: 
$$I(U;C) = \sum\_{e\_t \in \{1,0\}}\sum\_{e\_c \in \{1,0\}}P(U=e\_t, C=e\_c)log\_2\frac{P(U=e\_t, C=e\_c)}{P(U=e\_t)P(C=e\_C)}$$

$\chi^2$:

$$\chi^2(D,t,c)=\sum\_{e\_t \in \{1,0\}}\sum\_{e\_c \in \{1,0\}}\frac{(N\_{e\_te\_c} - E\_{e\_te\_c})^2}{E\_{e\_te\_c}}$$

And for Unigram, Bigram, Trigram, we selected top 100 features. Top 100 feature can be download [here](/static/top100.txt). There are 600 lines in this file:

* 1-100: MI-Unigram
* 101-200: Chi-Unigram
* 201-300: MI-Bigram
* 301-400: Chi-Bigram 
* 401-500: MI-Trigram
* 501-600: Chi-Trigram 

We then tried classification on different feature size. The following figures shows the result of that the feature size is from 1 to 100.

<div style="width:1130px;margin:20px auto">
    <img style="height:400px;" src="/static/feature_vs_acc.png" alt="Feature vs Accuracy">
    <img style="height:400px;" src="/static/feature_vs_f1.png" alt="Feature vs F1">
</div>

The following figure shows the result of MI when the feature size is from 1 to 1000.

<div style="width:1130px;margin:20px auto">
    <img style="height:400px;" src="/static/f_vs_acc_unigram.png" alt="Feature vs Accuracy">
    <img style="height:400px;" src="/static/f_vs_f1_unigram.png" alt="Feature vs F1">
</div>

The experiment of Bigram feature selection is running...

## Word Distance

We tried to reveal the relationship between words. By using [t-SNE](http://lvdmaaten.github.io/tsne/), which can reduce the dimension of high dimension dataset, we can visualize our data.

[Word Distance Figure](/tsne.html) shows the word in 2D. In this figure you can find out the distance of words and some clusters of words directly.