import glob
import yaml

licensed_dir = ".licenses/npm/"

files = glob.glob(licensed_dir + "**/*.yml", recursive=True)

for file in files:
    with open(file, 'r') as f:
        dep = yaml.safe_load(f)
        print(dep["name"] + "\n")
        print(dep["licenses"][0]["text"])
        print("------------------------------")