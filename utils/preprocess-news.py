import sys 
import nltk
import re
import numpy as np
import pandas as pd

from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

inputString = sys.argv[1]

stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

df = pd.DataFrame({'input':[inputString]})

def clean_text(text):
    text = re.sub(r'[^\w\s]','',text, re.UNICODE)
    text = text.lower()
    text = [lemmatizer.lemmatize(token) for token in text.split(" ")]
    text = [lemmatizer.lemmatize(token, "v") for token in text]
    text = [word for word in text if not word in stop_words]
    text = " ".join(text)
    return text

df['processed_input'] = df.input.apply(lambda x: clean_text(x))

df.processed_input.apply(lambda x: len(x.split(" "))).mean()

max_features = 1000
tokenizer = Tokenizer(num_words=max_features)
tokenizer.fit_on_texts(df['processed_input'])
list_tokenized = tokenizer.texts_to_sequences(df['processed_input'])

maxlen = 25

predictionArray = pad_sequences(list_tokenized, maxlen=maxlen)

x = list(predictionArray)

newList = []

x = list(x[0])

newList.append(x)

print(newList)

# print(arr)

# inputString = sys.argv[1]
# print(df['processed_input'])