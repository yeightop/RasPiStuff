f = open("RealAccountData.txt", "r")
#print("'"+f.read().replace("\t","','")+"'")
count = 0
 
# Using for loop
print("Using for loop")
for line in f:
    count += 1
    print("INSERT INTO Accounts (Name,Address,City,Zip,State) VALUES ('{}');".format(line.strip().replace("\t","','")))
 
# Closing files
f.close()