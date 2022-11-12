import pandas as pd
import sys, os

output_file = sys.argv[len(sys.argv)-1]
if os.path.exists(output_file):
    os.remove(output_file)

def merge_csv(li):
    add_header = True;
    
    for i in range(1, len(li)):
        if len(li[i]) <= 4 or li[i][-4:] != ".csv":
            raise Exception("Input and output must be CSV file")


    for i in range(1, len(li)-1):
        l = li[i].split('/');
        name = l[len(l)-1];
        try:
            chunk_container = pd.read_csv(li[i], chunksize=6000)
        except FileNotFoundError:
            print("File not found.")
        except pd.errors.ParserError:
            print("Parse error")
        except Exception:
            print("Some other exception")
        
        for chunk in chunk_container:
            chunk['filename'] = name
            chunk.to_csv(output_file, header = add_header, mode="a", index=False, encoding = 'utf-8')

        add_header = False

merge_csv(sys.argv)

