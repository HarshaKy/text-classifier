import sys 
import pandas as pd

from tensorflow.keras.preprocessing import sequence
from gensim.corpora import Dictionary

import spacy
nlp = spacy.load('en')

dictionary = Dictionary.load('/home/harsha/github/text-classifier/utils/dictionary-spam')

inputString = sys.argv[1]
df = pd.DataFrame()

df['input'] = pd.DataFrame({'input':[inputString]})

MAX_SEQUENCE_LEN = 12
UNK = 'UNK'
PAD = 'PAD'

def text_to_id_list(text, dictionary):
    return [dictionary.token2id.get(tok, dictionary.token2id.get(UNK))
            for tok in text_to_tokens(text)]

def texts_to_input(texts, dictionary):
    return sequence.pad_sequences(
        list(map(lambda x: text_to_id_list(x, dictionary), texts)), maxlen=MAX_SEQUENCE_LEN,
        padding='post', truncating='post', value=dictionary.token2id.get(PAD))

def text_to_tokens(text):
    return [tok.text.lower() for tok in nlp.tokenizer(text)
            if not (tok.is_punct or tok.is_quote)]


predict = texts_to_input(df.input, dictionary)

x = list(predict)

newList = []

x = list(x[0])

newList.append(x)

print(newList)