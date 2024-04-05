import Int "mo:base/Int";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Char "mo:base/Char";
import Nat32 "mo:base/Nat32";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Buffer "mo:base/Buffer";

module {
  private let cKey = 7;
  private let abc = "abcdefghijklmnopqrstuvwxyz";
  private let cInterval = 2;
  private let timeLength = 19;

  public func verifyToken(token: Text): (Int, Nat){
    var data: Text = removeItemInterval(token, cInterval);
    data := decryptCesar(cKey, data);
    data := removeItemInterval(data, cInterval);
    var tokenRes = "";
    var id = "";
    var cont = 0;
    for(c in Text.toIter(data)){
      if(cont < timeLength){
        tokenRes #= Char.toText(c);
      }else{
        id #= Char.toText(c);
      };
      cont+=1;
    };
    return (+Option.get(Nat.fromText(tokenRes), 0), Option.get(Nat.fromText(id), 0))
  };

  public func generateToken(userID: Nat): (Text, Int) {
    let time = Time.now();
    let timeToken = Int.toText(time) # Nat.toText(userID);
    var token = addNumberInterval(timeToken, cInterval);
    token := addNumberInterval(encryptCesar(cKey, token), cInterval);
    return (token, time)
  };

  private func encryptCesar(key: Nat, data: Text): Text{
    var token: Text = "";
    let abcArray = Iter.toArray(Text.toIter(abc));
    for(c in Text.toIter(data)){
      let itemNumber: Nat = Option.get(Nat.fromText(Char.toText(c)),0);
      let index: Nat = Nat.rem(itemNumber+key, Array.size(abcArray));
      token #= Char.toText(abcArray[index]);
    };
    return token;
  };

  private func decryptCesar(key: Nat, data: Text): Text{
    let map = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash);
    var count: Nat = 0; 
    for(c in Text.toIter(abc)){
      map.put(Char.toText(c), count);
      count += 1;
    };
    let abcArray = Iter.toArray(Text.toIter(abc));
    let newKey: Nat = Array.size(abcArray) - Nat.rem(key, Array.size(abcArray));
    let decrypt: [var Nat] = Array.init<Nat>(Array.size(Iter.toArray(Text.toIter(data))), 0);
    var index = 0;
    for(c in Text.toIter(data)){
      decrypt[index] := Option.get(map.get(Char.toText(c)), 0);
      index += 1;
    };
    var cesar: Text = "";
    for(c in decrypt.vals()){
      let indexAbc: Nat = Nat.rem(c+newKey, Array.size(abcArray));
      cesar #= Char.toText(abcArray[indexAbc]);
    };
    var token = "";
    for(c in Text.toIter(cesar)){
      token #= Nat.toText(Option.get(map.get(Char.toText(c)), 0));
    };
    return token;
  };

  private func addNumberInterval(data: Text, interval: Nat): Text {
    var token: Text = "";
    var count = 1;
    let timeArray = Iter.toArray(Text.toIter(Int.toText(Time.now())));
    var index: Nat = Array.size(timeArray)-1;
    for(c in Text.toIter(data)){
      if(count == interval){
        token #= Char.toText(c);
        token #= Char.toText(timeArray[index]);
        if(index == 0){
          index := Array.size(timeArray)-1
        }else{
          index -= 1;
        };
        count := 1;
      }else{
        token #= Char.toText(c);
        count += 1;
      };
    };
    return token;
  };

  private func removeItemInterval(data: Text, interval: Nat): Text {
    var token: Text = "";
    var count = 0;
    for(c in Text.toIter(data)){
      if(count == interval){
        count := 0;
      }else{
        token #= Char.toText(c);
        count += 1;
      };
    };
    return token;
  };

  //Function not related to authentication
  public func deleteItemsFromArray<T>(array: [T], toDelete: [T], equal : (T, T) -> Bool): [T]{
    let res = Buffer.Buffer<T>(0);
    let bufferToDelete = Buffer.fromArray<T>(toDelete);
    for(item in array.vals()){
      if(not Buffer.contains<T>(bufferToDelete, item, equal)){
        res.add(item);
      }
    };
    return Buffer.toArray(res);
  };

  public func appendArrays<T>(a: [T], b: [T], compare : (T, T) -> { #less; #equal; #greater }): [T]{
    let res = Buffer.Buffer<T>(0);
    for(item in a.vals()){
      res.add(item);
    };
    for(item in b.vals()){
      res.add(item);
    };
    Buffer.removeDuplicates<T>(res, compare);
    return Buffer.toArray(res);
  };
}