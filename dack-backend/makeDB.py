import backend as a

with a.app.app_context():

    a.db.drop_all()

    a.db.create_all()

print("DB remade")
