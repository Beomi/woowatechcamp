from faker import Factory
from datetime import datetime
import csv

fake = Factory.create('it_IT')

def create_names(fake):
    i = 0
    with open('data2.csv', 'w',newline='\n') as f:
        fw = csv.writer(f, delimiter=' ',
                            quotechar=',', quoting=csv.QUOTE_MINIMAL)

        for x in range(2000001):
            name = fake.first_name()
            time = datetime.now()
            fw.writerow([name, time])
            i += 1
            if i % 100:
                print(i)
if __name__ == "__main__":  
    create_names(fake)