from flask import Flask,render_template,url_for,redirect,request,session,flash
import joblib as jb
import sqlite3 as sq
from sklearn.ensemble import RandomForestRegressor


app=Flask(__name__)
app.secret_key="supersecret"

#Database creation
def init_db():
    conn=sq.connect("UserInfo.db")
    cur=conn.cursor()
    cur.execute('''create table if not exists UserData(id integer primary key autoincrement,Name text not null,
                UserName text not null unique, Email text not null unique,Password text not null unique) 
                ''')
    conn.commit()
    conn.close()

#Getting Circle Rate
def getCircleRate(SubCity,AreaType,GradeType):
    conn=sq.connect("PCircleRate.db")
    cur=conn.cursor()
    conn.commit()
    cond='''select CircleRate from Prayagraj where Tehsil=? and TypeArea=? and Grade=?'''
    cur.execute(cond,(SubCity,AreaType,GradeType))
    rw=cur.fetchone()
    if rw is None:
      return 0
    return rw[0]


@app.route("/")
def home():
    init_db()
    #session.pop("user",None)
    return render_template('index.html')
@app.route("/Home")
def homep():
    return render_template('index.html')
@app.route("/About")
def about():
    return render_template('Aproject.html')
@app.route("/Contact")
def contact():
    return render_template('Contact.html')
@app.route("/Team")
def Team():
    return render_template('Team.html')
@app.route("/Terms")
def Terms():
    return render_template('Terms.html')
@app.route("/Privacy")
def Privacy():
    return render_template('Privacy.html')
@app.route("/Login")
def login():
    return render_template('login.html')
@app.route("/Predict")
def predict():
    if "user" in session:
         return render_template('Predict.html')
    return render_template('login.html')
@app.route("/Forget")
def Forget():
    return render_template('forget.html')
@app.route("/Register")
def Register():
    return render_template('Register.html')

#Prediction Submit
@app.route("/submit",methods=["POST"])
def submit():
 if request.method=="POST": 
    State=request.form.get("State")
    District=request.form.get("City")
    SubDistrict=request.form.get("SubDistrict")
    SubCity=request.form.get("SubCity")
    AreaType=request.form.get("AreaType")
    GradeType=request.form.get("GradeType")
    RoadInfo=int(request.form.get("RoadInfo"))
    HouseSize=request.form.get("HouseSize")
    Bedrooms=request.form.get("Bedrooms")
    Kitchen=request.form.get("Kitchen")
    LivingRoom=request.form.get("LivingRoom")
    FurnishingStatus=request.form.get("FurnishingStatus")
    Area=int(request.form.get("Area"))
    Bathrooms=request.form.get("Bathrooms")
    Stories=request.form.get("Stories")
    s=int(Stories)
    StArea=Area*s
    #Getting circle Rate
    CircleRate=getCircleRate(SubCity,AreaType,GradeType)
    if CircleRate==0:
        return render_template("LocationNotFound.html")
    else:
        if RoadInfo==0:
            LandPrice=Area*CircleRate
        elif RoadInfo==1:
            LandPrice=Area*(CircleRate+CircleRate/10)
        elif RoadInfo==2:
            if AreaType=="Urban":
               LandPrice=Area*(CircleRate+(CircleRate*18.5)/100)
            elif AreaType=="SemiUrban":
               LandPrice=Area*(CircleRate+(CircleRate*20)/100)
            elif AreaType=="Rural":
               LandPrice=Area*(CircleRate+(CircleRate*24)/100)
    # Gettting Construction Cost
    if HouseSize=="0":
        Sarea=int(Bedrooms)*168+int(Kitchen)*120+int(LivingRoom)*320+int(Bathrooms)*48+72*s
        if Sarea>=StArea-5:
            return render_template('AreaUnAccept.html',Sarea=Sarea,Area=StArea,value=0)
        elif Sarea<StArea-60:
            return render_template('AreaUnAccept.html',Sarea=Sarea,Area=StArea,value=1)
    if HouseSize=="1":
        Sarea=int(Bedrooms)*100+int(Kitchen)*70+int(LivingRoom)*120+int(Bathrooms)*24+72*s
        if Sarea>=StArea-5:
            return render_template('AreaUnAccept.html',Sarea=Sarea,Area=StArea,value=2)
        elif Sarea<StArea-60:
            return render_template('AreaUnAccept.html',Sarea=Sarea,Area=StArea,value=3)
    if HouseSize=="2":
        Sarea=int(Bedrooms)*132+int(Kitchen)*100+int(LivingRoom)*168+int(Bathrooms)*35+72*s
        if Sarea>=StArea-5:
            return render_template('AreaUnAccept.html',Sarea=Sarea,Area=StArea,value=4)
        elif Sarea<StArea-60:
            return render_template('AreaUnAccept.html',Sarea=Sarea,Area=StArea,value=5)
    x=[[Area,Bedrooms,Bathrooms,Stories,FurnishingStatus,Kitchen,LivingRoom,HouseSize]]
    #model loading
    model=jb.load("HousePri")
    y=model.predict(x)
    return render_template('UserPredictionInfo.html',TC=round(y[0]+LandPrice),LP=LandPrice,CC=round(y[0]),
     St=State,Ds=District,Sd=SubDistrict, Sc=SubCity,At=AreaType,Gt=GradeType,Hs=HouseSize,Ah=Area,Bd=Bedrooms,Bt=Bathrooms,Lr=LivingRoom,So=Stories,Hfs=FurnishingStatus,Nk=Kitchen)
 return "Hello"
#Login User
@app.route("/LoginUser",methods=["GET","POST"])
def LoginUser():
    if request.method=="POST": 
       Username=request.form.get("UserName")
       Password=request.form.get("Password")
       conn=sq.connect("UserInfo.db")
       cur=conn.cursor()
       conn.commit()
       cond='''select UserName,Password,Name from UserData where UserName=? and Password=?'''
       cur.execute(cond,(Username,Password))
       rw=cur.fetchone()
       if rw is None:
           return redirect(url_for('login'))
       else:
           session["user"]=rw[0]
           session["Name"]=rw[2]
           #flash("login succesful")
           return render_template("Predict.html") 
    return redirect(url_for('login'))

#User Registration
@app.route("/RegisterUser",methods=["POST"])
def RegisterUser():
    if request.method=="POST":
        Name=request.form.get("FullName")
        UserName=request.form.get("UserName")
        Email=request.form.get("Email")
        Password=request.form.get("Password")
        CPassword=request.form.get("CPassword")
        if Password==CPassword:
            conn=sq.connect("UserInfo.db")
            cur=conn.cursor()
            try:
              cur.execute('insert into UserData(Name,UserName,Email,Password) values(?,?,?,?)',
                        (Name,UserName,Email,Password))
              conn.commit()
            except sq.IntegrityError:
                return ''' <h1>User already exists<h1>'''
            finally:
              conn.close()
            return redirect(url_for('login'))
        return render_template("Register.html")
#Forget Password
@app.route("/ForgetBtn", methods=["POST"])
def forgetbtn():
        if request.method=="POST":
            em=request.form.get("Email")
            conn=sq.connect("UserInfo.db")
            cur=conn.cursor()
            conn.commit()
            cur.execute("SELECT Password FROM UserData WHERE Email=?",(em,))
            rw=cur.fetchone()
            if rw is None:
                return "Incorrect Email"
            return f''' Your Password is  <h1> {rw[0]}</h1> '''
#map integration