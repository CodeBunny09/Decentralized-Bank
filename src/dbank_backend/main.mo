import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  stable var startTime = Time.now();

  Debug.print(debug_show(startTime));

  public func topUp(amt: Float) {
    currentValue += amt;
    Debug.print(debug_show(currentValue));
  };

  // topUp();

  public func withdraw(amt: Float) {

    if (amt <= currentValue) {
      currentValue -= amt;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Not enough balance! ");
    }
  };

  // withdraw();

  public query func checkBal() : async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;

    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;

  };

}