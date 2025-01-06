# setup.py

from setuptools import setup, find_packages

setup(
    name="skill-issue",
    version="0.0.2",
    packages=find_packages(),
    install_requires=[],
    author="Krish Verma",
    author_email="krishverma2004@gmail.com",
    description="Seriously, if you have to read this, skill issue on your part",
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url="https://github.com/yourusername/skill-issue",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
