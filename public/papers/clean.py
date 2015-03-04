import re, sys

fname = sys.argv[1]
raw = open(fname, "r").read()
clean1 = re.sub(r'svg:', '', raw)
clean2 = re.sub(r':svg', '', clean1)
with open(fname+".clean", "w") as f:
	f.write(clean2)


